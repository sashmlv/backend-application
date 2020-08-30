'use strict';

const {spawn} = require('child_process'),
  chokidar = require('chokidar'),
  glob = require('glob'),
  chalk = require('chalk'),
  paths = [

    '../packages/test/**/*',
  ].filter(_=>_),

  /**
   * see - https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
   * for tasks arguments
   **/
  tasks = [

    {cmd: 'npm', arg: ['run', 'prepare'], opt: {cwd: '../packages/@asparts/contacts'}},
    {cmd: 'node', arg: ['start'], opt: {listen: true}}
  ].filter(_=>_);

for (let i = 0; i < paths.length; i++) {

  const files = glob.sync(paths[i]);

  if (!files.length) {

    console.log(chalk.redBright(`Files not found for:\n ${paths[i]}`));
    process.exit();
  };
};

let prcs = [], // processes list
  ready = false;

chokidar
  .watch(paths)
  .on('ready', async _=> {

    console.log(chalk.yellowBright('Ready for changes!'));
    ready = true;
    await run();
  })
  .on('all', async (cmd, path) => {

    try {

      console.log(chalk.blueBright(`${cmd} ${path}`));

      if (ready) {

        await run();
      };

    } catch (e) {

      console.log(chalk.redBright(e));
    };
  })
  .on('error', e => console.log(chalk.redBright(e)));

/**
 * Run tasks
 * @return {undefined}
 **/
async function run () {

  for (let i = 0; i < tasks.length; i ++) {

    try {

      const {cmd, arg, opt = {}} = tasks[i];

      if (opt.listen) { // task listen, not closing

        let prc;

        while((prc = prcs.shift())) { // close all listen tasks before new one

          prc.kill();
        };

        prcs.push(await execute(cmd, arg, opt, false));

      } else {

        await execute(cmd, arg, opt, true);
      }
    }
    catch (e) {

      process.stdout.write(chalk.redBright(`${e}`));
    };
  };
};

/**
 * Execute task
 * @param {string} task
 * @param {array} arg
 * @param {object} opt
 * @param {boolean} wait - wait until process done
 * @return {object} Return child process
 **/
function execute (task, arg, opt, wait) {

  return new Promise((res, rej) => {

    let child = spawn(task, arg, opt);

    child.stdout.on('data', data => {

      process.stdout.write(`${data}`);
    });

    child.stderr.on('data', data => {

      rej(data);
    });

    child.on('close', (code) => {

      res(child);
    });

    if (!wait) {

      res(child);
    };
  });
};
