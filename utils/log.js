import alert from 'cli-alerts';

export default function log(info) {
  alert({
    type: 'warning',
    name: 'DEBUG LOG',
    msg: '',
  });

  console.log(info);
  console.log();
}
