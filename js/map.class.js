class Map {
  constructor(maze) {
    this.col = maze.col * 2 + 1;
    this.row = maze.row * 2 + 1;
    this.grid = new Array(this.col * this.row);

    this.createFrom(maze);
  }

  createFrom(maze) {
    for (let y = 1; y <= maze.row; y++)
      for (let x = 1; x <= maze.col; x++) {
        this.setCellContent(x, y, ' ');
        this.addWall(maze, 'N', x, y);
        this.addWall(maze, 'E', x, y);
        this.addWall(maze, 'S', x, y);
        this.addWall(maze, 'W', x, y);
      }

    for (let y = 1; y <= maze.row; y++)
      for (let x = 1; x <= maze.col; x++) {
        //if (!maze.cell(x, y).wall['N']) this.removeWall('N', x, y);
        if (!maze.cell(x, y).wall['E']) this.removeWall(maze, 'E', x, y);
        if (!maze.cell(x, y).wall['S']) this.removeWall(maze, 'S', x, y);
        //if (!maze.cell(x, y).wall['W']) this.removeWall('W', x, y);
      }
  }

  addWall(maze, direction, x, y) {
    switch (direction) {
      case 'N':
        this.addCorner(maze, x, y, 'UL');
        this.addHorizontalPart(x, y, 'U');
        this.addCorner(maze, x, y, 'UR');
        break;
      case 'E':
        this.addCorner(maze, x, y, 'UR');
        this.addVerticalPart(x, y, 'R');
        this.addCorner(maze, x, y, 'LR');
        break;
      case 'S':
        this.addCorner(maze, x, y, 'LL');
        this.addHorizontalPart(x, y, 'L');
        this.addCorner(maze, x, y, 'LR');
        break;
      case 'W':
        this.addCorner(maze, x, y, 'UL');
        this.addVerticalPart(x, y, 'L');
        this.addCorner(maze, x, y, 'LL');
    }
  }

  addCorner(maze, x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'UL': X -= 1; Y -= 1; break;
      case 'UR': X += 1; Y -= 1; break;
      case 'LL': X -= 1; Y += 1; break;
      case 'LR': X += 1; Y += 1; break;
    }

    this.grid[Y * this.col + X] = '+';
  }

  addVerticalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'L': X -= 1; break;
      case 'R': X += 1; break;
    }

    this.grid[Y * this.col + X] = '|';
  }

  addHorizontalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'U': Y -= 1; break;
      case 'L': Y += 1; break;
    }

    this.grid[Y * this.col + X] = '---';
  }

  removeWall(maze, direction, x, y) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (direction) {
      case 'N':
        this.addCorner(maze, x, y, 'UL');
        this.removeHorizontalPart(x, y, 'U');
        this.addCorner(maze, x, y, 'UR');
        break;
      case 'E':
        this.addCorner(maze, x, y, 'UR');
        this.removeVerticalPart(x, y, 'R');
        this.addCorner(maze, x, y, 'LR');
        break;
      case 'S':
        this.addCorner(maze, x, y, 'LL');
        this.removeHorizontalPart(x, y, 'L');
        this.addCorner(maze, x, y, 'LR');
        break;
      case 'W':
        this.addCorner(maze, x, y, 'UL');
        this.removeVerticalPart(x, y, 'L');
        this.addCorner(maze, x, y, 'LL');
    }
  }

  removeVerticalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'L': X -= 1; break;
      case 'R': X += 1; break;
    }

    this.grid[Y * this.col + X] = ' ';
  }

  removeHorizontalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'U': Y -= 1; break;
      case 'L': Y += 1; break;
    }

    this.grid[Y * this.col + X] = '   ';
  }

  setCellContent(x, y, content) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    this.grid[Y * this.col + X] = ' ' + content + ' ';
  }

  toString() {
    let string = '';

    for (let Y = 0; Y < this.row; Y++) {
      for (let X = 0; X < this.col; X++)
        string += this.grid[Y * this.col + X];

      string += '\n';
    }

    return string;
  }

  draw(surface) {
    surface.innerHTML = this.toString();
  }
}

let corner = [
  ' ',
  '&boxh;',
  '&boxv;',
  '&boxdl;',
  '&boxh;',
  '&boxh;',
  '&boxdr;',
  '&boxhd;',
  '&boxv;',
  '&boxul;',
  '&boxv;',
  '&boxvl;',
  '&boxur;',
  '&boxhu;',
  '&boxvr;',
  '&boxvh;'
];

class NiceMap extends Map {
  addCorner(maze, x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;
    let cornerIndex = 0;

    switch (location) {
      case 'UL':
        X -= 1; Y -= 1;
        if (y>1 && maze.cell(x,y-1).wall['W']) cornerIndex += 8;
        if (maze.cell(x,y).wall['N']) cornerIndex += 4;
        if (maze.cell(x,y).wall['W']) cornerIndex += 2;
        if (x>1 && maze.cell(x-1,y).wall['N']) cornerIndex += 1;
        break;
      case 'UR':
        X += 1; Y -= 1;
        if (y>1 && maze.cell(x,y-1).wall['E']) cornerIndex += 8;
        if (x<maze.col && maze.cell(x+1,y).wall['N']) cornerIndex += 4;
        if (maze.cell(x,y).wall['E']) cornerIndex += 2;
        if (maze.cell(x,y).wall['N']) cornerIndex += 1;
        break;
      case 'LL':
        X -= 1; Y += 1;
        if (maze.cell(x,y).wall['W']) cornerIndex += 8;
        if (maze.cell(x,y).wall['S']) cornerIndex += 4;
        if (y<maze.row && maze.cell(x,y+1).wall['W']) cornerIndex += 2;
        if (x>1 && maze.cell(x-1,y).wall['S']) cornerIndex += 1;
        break;
      case 'LR':
        X += 1; Y += 1;
        if (maze.cell(x,y).wall['E']) cornerIndex += 8;
        if (x<maze.col &&maze.cell(x+1,y).wall['S']) cornerIndex += 4;
        if (y<maze.row && maze.cell(x,y+1).wall['E']) cornerIndex += 2;
        if (maze.cell(x,y).wall['S']) cornerIndex += 1;
        break;
    }

    this.grid[Y * this.col + X] = corner[cornerIndex];
  }

  addVerticalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'L': X -= 1; break;
      case 'R': X += 1; break;
    }

    this.grid[Y * this.col + X] = '&boxv;';
  }

  addHorizontalPart(x, y, location) {
    let X = 2 * (x - 1) + 1;
    let Y = 2 * (y - 1) + 1;

    switch (location) {
      case 'U': Y -= 1; break;
      case 'L': Y += 1; break;
    }

    this.grid[Y * this.col + X] = '&boxh;&boxh;&boxh;';
  }
}
