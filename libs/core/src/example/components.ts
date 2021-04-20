import { Component } from '../component';

export class Administrator extends Component {
  level!: number;
}

export class Player extends Component {
  handle!: string;
}

export class Playing extends Component {
  since!: Date;
}

export class Character extends Component {
  name!: string;
}

export class Vehicle extends Component {
  model!: string;
}

export class VehicleEngine extends Component {
  fuel!: number;
  running!: boolean;
}
