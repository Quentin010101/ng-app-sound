import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberComponent } from '../../../../../shared/input/number/number.component';
import { SnakeVariable } from '../snake.component';

@Component({
  selector: 'app-snake-formulaire',
  standalone: true,
  imports: [ReactiveFormsModule, NumberComponent],
  templateUrl: './snake-formulaire.component.html',
  styleUrl: './snake-formulaire.component.scss'
})
export class SnakeFormulaireComponent {
  @Input() formulaireActif: boolean = true
  @Input() variables: SnakeVariable | null = null
  @Output() emitter = new EventEmitter<SnakeVariable>()

  speedMax: number = 10
  speedMin: number = 1
  gridMax: number = 20
  gridMin: number = 7
  incrementationMax: number = 10
  incrementationMin: number = 1
  incrementationStep: number = 1

  variableForm = new FormGroup({
    grid: new FormControl(0, [Validators.min(this.gridMin), Validators.max(this.gridMax)]),
    speed: new FormControl(0, [Validators.min(this.speedMin), Validators.max(this.speedMax)]),
    incrementation: new FormControl(0, [Validators.min(this.incrementationMin), Validators.max(this.incrementationMax)])
  })

  ngOnInit(){
    this.updateFormulaire(this.variables)
    this.variableForm.valueChanges.subscribe((changes) => {
      if(changes.grid && changes.incrementation && changes.speed){
        let snakeV = new SnakeVariable();
        snakeV.grid = changes.grid
        snakeV.speed = changes.speed
        snakeV.incrementation = changes.incrementation
        this.emitter.emit(snakeV)
      }
    })
  }

  private updateFormulaire(variables: SnakeVariable | null){
    if(variables){
      this.variableForm.controls.grid.setValue(variables.grid)
      this.variableForm.controls.speed.setValue(variables.speed)
      this.variableForm.controls.incrementation.setValue(variables.incrementation)
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['formulaireActif']){
      if(changes['formulaireActif'].currentValue){
        this.variableForm.enable()
      }else if(!changes['formulaireActif'].currentValue){
        this.variableForm.disable()
      }
    }
  }

}

