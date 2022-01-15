export class MainController {
  life: NodeJS.Timer | null = null; // 생명 주기
  frame: number = 30; // 프레임
  element: HTMLElement;
  geometry: Geometry[] = []; // 지오메트리 객체

  constructor(_element: HTMLElement) {
    this.element = _element;
  }

  add(_geometry: Geometry): void {
    // 객체 추가
    this.geometry.push(_geometry);
  }

  play(_play: boolean): void {
    // 실행
    if (_play) {
      if (!this.life) {
        const time = Math.ceil(1000 / this.frame);
        this.life = setInterval(() => {
          this.geometry.map((element) => {
            element.action();
          });
        }, time);
      }
    } else if (this.life) {
      clearInterval(this.life);
      this.life = null;
    }
  }
}

abstract class Geometry {
  element: HTMLElement | null = null;
  posX: number = 0;
  posY: number = 0;
  targetX: number = 0;
  targetY: number = 0;
  width: number = 0;
  height: number = 0;
  moveSpeed: number = 0;
  moveSpeedMax: number = 2;
  moveAccelation: number = 0.05;
  colorFrame: string[] = ["#e05a4a", "#e1793f", "#f1ca4c", "#44b39d", "#c9c462"];

  constructor(_element: HTMLElement) {
    this.element = _element;
  }

  abstract setStyle(element: HTMLElement): void; // 초기 설정

  setPositionViewportX(sizeX: number): void {
    const _sizeX = sizeX * 2;
    this.posX = Math.floor(Math.random() * (window.innerWidth - _sizeX * 2) + _sizeX);
    this.targetX = this.posX;
  }
  setPositionViewportY(sizeY: number): void {
    const _sizeY = sizeY * 2;
    this.posY = Math.floor(Math.random() * (window.innerHeight - _sizeY * 2) + _sizeY);
    this.targetY = this.posY;
  }
  setPositionViewport(sizeX: number, sizeY: number): void {
    const _sizeX = sizeX * 2;
    const _sizeY = sizeY * 2;
    this.posX = Math.floor(Math.random() * (window.innerWidth - _sizeX * 2) + _sizeX);
    this.posY = Math.floor(Math.random() * (window.innerHeight - _sizeY * 2) + _sizeY);
    this.targetX = this.posX;
    this.targetY = this.posY;
  }
  setPositionTarget(sizeX: number, sizeY: number): void {
    const _sizeX = sizeX * 2;
    const _sizeY = sizeY * 2;
    this.targetX = Math.floor(Math.random() * (window.innerWidth - _sizeX * 2) + _sizeX);
    this.targetY = Math.floor(Math.random() * (window.innerHeight - _sizeY * 2) + _sizeY);
  }

  action(): void {
    // 매 프레임 실행
    const distanceX = this.width;
    const distanceY = this.height;

    const _posX = Math.round(this.posX);
    const _posY = Math.round(this.posY);
    const _targetX = Math.round(this.targetX);
    const _targetY = Math.round(this.targetY);
    const absX = Math.abs(_posX - _targetX);
    const absY = Math.abs(_posY - _targetY);

    if (absX < distanceX && absY < distanceY) {
      // 목표 지점에 도달했을 시
      this.moveSpeed = 0;
      this.setPositionTarget(distanceX, distanceY); // 이동 목표 랜덤 설정
    } else {
      // 도달하지 못한 경우
      const accelation = this.moveAccelation + this.moveSpeed;
      this.moveSpeed = this.moveSpeedMax < accelation ? this.moveSpeedMax : accelation;
      if (!(absX < distanceX)) {
        if (this.posX > this.targetX) {
          this.posX -= this.moveSpeed;
        } else if (this.posX < this.targetX) {
          this.posX += this.moveSpeed;
        }
      }
      if (!(absY < distanceY)) {
        if (this.posY > this.targetY) {
          this.posY -= this.moveSpeed;
        } else if (this.posY < this.targetY) {
          this.posY += this.moveSpeed;
        }
      }
    }

    // 뷰 포트 설정
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    if (this.posX <= distanceX || this.posX >= maxWidth - distanceX) {
      this.setPositionViewportX(distanceX);
    }
    if (this.posY <= distanceY || this.posY >= maxHeight - distanceY) {
      this.setPositionViewportY(distanceY);
    }

    // 좌표 설정
    this.element!.style.top = `${this.posY}px`;
    this.element!.style.left = `${this.posX}px`;
  }
}

export class Line extends Geometry {
  constructor(_element: HTMLElement) {
    super(_element);
    this.setStyle(_element);
  }

  setStyle(element: HTMLElement): void {
    const isRotate: boolean = Math.round(Math.random() * 1) == 0 ? true : false;
    const _minSizeX = isRotate ? 50 : 5;
    const _maxSizeX = isRotate ? 100 : 10;
    const _minSizeY = isRotate ? 5 : 50;
    const _maxSizeY = isRotate ? 10 : 100;
    this.width = Math.floor(Math.random() * _minSizeX) + _maxSizeX;
    this.height = Math.floor(Math.random() * _minSizeY) + _maxSizeY;

    this.setPositionViewport(this.width, this.height);

    const _color: number = Math.floor(Math.random() * (this.colorFrame.length - 1));
    const isBorder: boolean = Math.round(Math.random() * 2) == 0 ? true : false;

    element.style.position = "absolute";
    element.style.top = `${this.posY + this.height / 2}px`;
    element.style.left = `${this.posX + this.width / 2}px`;
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
    if (isBorder) {
      element.style.border = `2px solid ${this.colorFrame[_color]}`;
    } else {
      element.style.backgroundColor = this.colorFrame[_color];
    }
  }
}

export class Circle extends Geometry {
  constructor(_element: HTMLElement) {
    super(_element);
    this.setStyle(_element);
  }

  setStyle(element: HTMLElement): void {
    const _minSize = 20;
    const _maxSize = 100;
    const _finalSize = Math.floor(Math.random() * _maxSize) + _minSize;
    this.width = _finalSize;
    this.height = _finalSize;

    this.setPositionViewport(this.width, this.height);

    const _color: number = Math.floor(Math.random() * (this.colorFrame.length - 1));
    const isBorder: boolean = Math.round(Math.random() * 1) == 0 ? true : false;

    element.style.position = "absolute";
    element.style.top = `${this.posY + this.height / 2}px`;
    element.style.left = `${this.posX + this.width / 2}px`;
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
    element.style.borderRadius = "1000px";
    if (isBorder) {
      element.style.border = `2px solid ${this.colorFrame[_color]}`;
    } else {
      element.style.backgroundColor = this.colorFrame[_color];
    }
  }
}

export class Square extends Geometry {
  constructor(_element: HTMLElement) {
    super(_element);
    this.setStyle(_element);
  }

  setStyle(element: HTMLElement): void {
    const _minSize = 20;
    const _maxSize = 100;
    this.width = Math.floor(Math.random() * _maxSize) + _minSize;
    this.height = Math.floor(Math.random() * _maxSize) + _minSize;

    this.setPositionViewport(this.width, this.height);

    const deg = Math.floor(Math.random() * 360);
    const _color: number = Math.floor(Math.random() * (this.colorFrame.length - 1));
    const isBorder: boolean = Math.round(Math.random() * 2) == 0 ? true : false;

    element.style.position = "absolute";
    element.style.top = `${this.posY + this.height / 2}px`;
    element.style.left = `${this.posX + this.width / 2}px`;
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
    element.style.transform = `rotate(${deg}deg)`;
    if (isBorder) {
      element.style.border = `2px solid ${this.colorFrame[_color]}`;
    } else {
      element.style.backgroundColor = this.colorFrame[_color];
    }
  }
}

export class Triangle extends Geometry {
  constructor(_element: HTMLElement) {
    super(_element);
    this.setStyle(_element);
  }

  setStyle(element: HTMLElement): void {
    const _minSize = 10;
    const _maxSize = 50;
    const _finalSize = Math.floor(Math.random() * _maxSize) + _minSize;
    this.width = _finalSize;
    this.height = _finalSize;

    this.setPositionViewport(this.width, this.height);

    const deg = Math.floor(Math.random() * 360);
    const _color: number = Math.floor(Math.random() * (this.colorFrame.length - 1));

    element.style.position = "absolute";
    element.style.top = `${this.posY + this.height / 2}px`;
    element.style.left = `${this.posX + this.width / 2}px`;
    element.style.borderLeft = `${this.width}px solid transparent`;
    element.style.borderRight = `${this.width}px solid transparent`;
    element.style.borderBottom = `calc(${this.width * 1.732}px) solid ${this.colorFrame[_color]}`;
    element.style.transform = `rotate(${deg}deg)`;
  }
}
