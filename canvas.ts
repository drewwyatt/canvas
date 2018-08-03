class Canvas {
  private element: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private images: HTMLImageElement[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isDragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  
  constructor(canvasId: string) {
    const element = document.getElementById(canvasId) as HTMLCanvasElement | undefined;
    if (element) {
      console.log('setting element and context');
      this.element = element;
      this.context = this.element.getContext('2d')!;
      this.offsetX = this.element.offsetLeft;
      this.offsetY = this.element.offsetTop;

      this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.element.addEventListener('mouseout', this.handleMouseOut.bind(this));
    } else {
      throw new Error(`Could not get element ${canvasId}`);
    }
  }

  addImage(src: string): void {
    const image = new Image(60, 45);
    image.onload = this.createImageOnload() as any;
    image.src = src;
    this.images.push(image);
  }

  private createImageOnload() {
    const { element, context } = this;
    return function(this: HTMLImageElement) {
      element.width = this.naturalWidth;
      element.height = this.naturalHeight;
      context.drawImage(this, 0, 0, this.width, this.height);
    }
  }

  private handleMouseDown(e: MouseEvent){
    this.mouseX = e.clientX - this.offsetX;
    this.mouseY = e.clientY - this.offsetY;
    // set the drag flag
    this.isDragging=true;
  }

  private handleMouseUp(e: MouseEvent){
    this.mouseX = e.clientX - this.offsetX;
    this.mouseY = e.clientY - this.offsetY;
    // clear the drag flag
    this.isDragging = false;
  }

  private handleMouseOut(e: MouseEvent){
    this.mouseX = e.clientX - this.offsetX;
    this.mouseY = e.clientY - this.offsetY;
    // user has left the canvas, so clear the drag flag
    this.isDragging = false;
  }

  private handleMouseMove(e: MouseEvent){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    // if the drag flag is set, clear the canvas and draw the image
    if(this.isDragging){
        const { element, context, mouseX, mouseY, images } = this;
        const img = images[0];
        this.context.clearRect(0, 0, element.width, element.height);
        this.context.drawImage(img, mouseX - 128 / 2, mouseY - 120 / 2, 128, 120);
    }
  }
}

function init() {
  console.log('initializing...');
  new Canvas('canvas').addImage('bb.png');
}
