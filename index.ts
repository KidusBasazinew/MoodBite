import concurrently from 'concurrently';

concurrently([
   {
      name: 'server',
      command: 'bun run dev',
      cwd: 'packages/server',
      prefixColor: 'cyan',
   },
   {
      name: 'mobile',
      command: 'bun run dev',
      cwd: 'packages/mobile',
      prefixColor: 'green',
   },
]);
