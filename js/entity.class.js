class Entity {
  constructor(maze, map, x, y) {
    this.maze = maze;
    this.map = map;
    this.x = x;
    this.y = y;
  }

  move(direction) {
    if (!this.maze.cell(this.x, this.y).wall[direction]) {
      this.map.setCellContent(this.x, this.y, ' ');
      switch (direction) {
        case 'N': this.y -= 1; break;
        case 'E': this.x += 1; break;
        case 'S': this.y += 1; break;
        case 'W': this.x -= 1;
      }
      this.draw();
    }
  }
}

class Player extends Entity {
  constructor(maze, map, x = 1, y = 1) {
    super(maze, map, x , y);
  }

  draw() {
    this.map.setCellContent(this.x, this.y, '<span id="player">@</span>');
  }
}

class Monster extends Entity {
  draw() {
    this.setCellContent(this.x, this.y, '<span class="monster">*</span>');
  }
}
