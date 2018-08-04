import { Canvas } from './models/canvas';

const CANVAS_ID = 'my-canvas';

const init = () => {
  console.log('Stating up...');

  console.log('creating canvas.CANVAS_ID..');
  const element = document.createElement('canvas');
  element.id = CANVAS_ID;

  console.log('Adding canvas to DOM');
  document.body.appendChild(element);

  console.log('Initializing state...');
  new Canvas(CANVAS_ID).addImage('bb.png');

  console.log('Done.');
};

window.onload = init;