enum State {
  IDLE = 0, // 대기
  MOVE = 1, // 이동
  RUN = 2, // 달리기
  ATTACK = 3, // 공격
}

enum Direction {
  LEFT = -1, // 좌
  RIGHT = 1, // 우
}

class Bird {
  state = State.IDLE; // 상태
  action = null; // 행동
  frame: number = 30; // 프레임 재생 빈도
  posX: number = 0; // X 좌표
  posY: number = 0; // Y 좌표
  targetElement: HTMLElement | null = null; // 목표 엘리먼트
  targetX: number = 0; // 목표 X 좌표
  targetY: number = 0; // 목표 Y 좌표
  directionX: Direction = Direction.LEFT; // X축 방향
  rotateY: number = 0; // Y축 회전
  animationIndex: number = 0; // 애니메이션 인덱스
  moveSpeed: number = 0; // 현재 속도
  moveSpeedMax: number = 35; // 최대 속도
  moveSpeedAnimation: number = 15; // 가속에 따른 애니메이션 처리 인덱스
  moveSpeedAcceleration: number = 0.5; // 가속도
  moveSpeedDeceleration: number = 2; // 감속도
  mainElement: HTMLElement | null = null; // 기준 엘리먼트
  imageElement: HTMLElement | null = null; // 이미지 엘리먼트
  lifeInterval: NodeJS.Timer | null = null; // 프레임 객체
  prefix: string = ""; // 깃허브에 따른 소스 경로 재설정

  constructor(element: HTMLElement | null, prefix: string | null) {
    this.mainElement = element;
    this.prefix = prefix ? prefix : "";

    if (this.mainElement) {
      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;
      const node = document.createElement("img");
      this.imageElement = this.mainElement!.appendChild(node);
      this.imageElement!.style.position = "absolute";
      this.posX = viewWidth / 2;
      this.posY = viewHeight / 2;
      this.play(true);
    }
  }

  // 새 생명 주기
  play(_play: boolean): void {
    if (_play) {
      if (this.mainElement && !this.lifeInterval) {
        const time = Math.ceil(1000 / this.frame);
        this.lifeInterval = setInterval(() => {
          this.birdRender();
          this.birdAction();
        }, time);
      }
    } else if (this.lifeInterval) {
      clearInterval(this.lifeInterval);
      this.lifeInterval = null;
    }
    return;
  }

  // 새 행동
  birdAction(): void {
    // 위치 설정
    this.imageElement!.style.top = `${this.posY}px`;
    this.imageElement!.style.left = `${this.posX}px`;
    this.imageElement!.style.transform = `translate3d(-50%, -40%, 0) scaleX(${this.directionX}) Rotate(${this.rotateY}deg)`;

    // 목표 설정
    this.setTargetPosition();

    // 값
    const _posX = Math.floor(this.posX);
    const _posY = Math.floor(this.posY);
    const _targetX = Math.floor(this.targetX);
    const _targetY = Math.floor(this.targetY);
    const absX = Math.abs(_posX - _targetX);
    const absY = Math.abs(_posY - _targetY);

    // 마우스 따라가기
    const distanceX = 50;
    const distanceY = 10;
    if (absX < distanceX + this.moveSpeedMax && absY < distanceY + this.moveSpeedMax) {
      this.setState(State.IDLE);
      this.moveSpeed = 0;
    } else {
      const targetDistance = Math.sqrt(Math.abs(distanceX - absX) ** 2 + Math.abs(distanceY - absY) ** 2) / 2;
      const targetDistanceAnimationTransform = Math.floor(this.moveSpeed / this.moveSpeedDeceleration);
      if (Math.floor(targetDistance / targetDistanceAnimationTransform) <= this.moveSpeedAnimation) {
        this.moveSpeed =
          this.moveSpeed > this.moveSpeedAcceleration
            ? this.moveSpeed - this.moveSpeedDeceleration
            : this.moveSpeedAcceleration;
      } else {
        this.moveSpeed =
          this.moveSpeed < this.moveSpeedMax ? this.moveSpeed + this.moveSpeedAcceleration : this.moveSpeed;
      }
      if (this.moveSpeed >= this.moveSpeedAnimation) {
        this.setState(State.RUN);
      } else {
        this.setState(State.MOVE);
      }

      // 이동
      const _moveSpeed =
        absX >= distanceX && absY >= distanceY
          ? Math.sqrt(this.moveSpeed ** 2 + this.moveSpeed ** 2) / 2
          : this.moveSpeed;
      if (absX >= distanceX) {
        if (_posX < _targetX) {
          this.posX += _moveSpeed;
        } else if (_posX > _targetX) {
          this.posX -= _moveSpeed;
        }
      }
      if (absY >= distanceY) {
        if (_posY < _targetY) {
          this.posY += _moveSpeed;
        } else if (_posY > _targetY) {
          this.posY -= _moveSpeed;
        }
      }
      // X축 방향
      if (_posX > _targetX) {
        this.directionX = Direction.LEFT;
      } else if (_posX < _targetX) {
        this.directionX = Direction.RIGHT;
      }
      // Y축 회전
      const direction = Math.abs(
        Math.floor((180 / Math.PI) * Math.atan2(this.posX - this.targetX, this.posY - this.targetY) - 270) % 360
      );
      if (!((direction > 210 && direction < 330) || (direction > 70 && direction < 110))) {
        this.rotateY = this.directionX == Direction.LEFT ? this.directionX * 180 - direction : direction;
      } else {
        // 예외 각도
        if (direction > 180 && direction < 360) {
          // 위
          this.rotateY = 350;
        } else if (direction > 0 && direction < 180) {
          // 아래
          this.rotateY = 50;
        }
      }
    }

    // 뷰 포트 가두기
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    if (_posX < 0) {
      this.posX = 0;
    } else if (_posX > viewWidth) {
      this.posX = viewWidth;
    }
    if (_posY < 0) {
      this.posY = 0;
    } else if (_posY > viewHeight) {
      this.posY = viewHeight;
    }
    return;
  }

  // 새 렌더링
  birdRender(): void {
    let animationSprite = "";
    let maxAnimation = 0;
    switch (this.state) {
      case State.IDLE:
        animationSprite = `${this.prefix}/images/bird_simulator/eagle/idle/${this.animationIndex}.png`;
        maxAnimation = 12;
        break;
      case State.MOVE:
        animationSprite = `${this.prefix}/images/bird_simulator/eagle/move/${this.animationIndex}.png`;
        maxAnimation = 10;
        break;
      case State.RUN:
        animationSprite = `${this.prefix}/images/bird_simulator/eagle/run/${this.animationIndex}.png`;
        maxAnimation = 7;
        break;
      case State.ATTACK:
        animationSprite = `${this.prefix}/images/bird_simulator/eagle/attack/${this.animationIndex}.png`;
        maxAnimation = 15;
        if (this.animationIndex >= maxAnimation) {
          this.setState(State.IDLE);
        }
        break;
    }
    this.imageElement!.setAttribute("src", `${animationSprite}`);
    this.animationIndex = this.animationIndex >= maxAnimation - 1 ? 0 : this.animationIndex + 1;
    return;
  }

  // 상태 변경
  setState(state: State) {
    if (this.state != state) {
      this.state = state;
      this.animationIndex = 0;
    }
  }

  // 목표 설정
  setTargetElement(_targetElement: HTMLElement | null): void {
    this.targetElement = _targetElement;
    return;
  }

  // 목표 좌표로 설정
  setTargetPosition(): void {
    this.targetX = parseFloat(this.targetElement!.style.left);
    this.targetY = parseFloat(this.targetElement!.style.top);
    return;
  }
}

export default Bird;
