import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = "HOLA!";
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio'
  ]);
  name = signal('CESAR');
  age = 35;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal ({
    name: 'Cesar',
    age: 35,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  /* Controladores */
  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });
  nameCtrl = new FormControl('name', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  clickHandler(){
    alert('Event Binding')
  }

  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
      ...prevState,
      age: parseInt(newValue, 10)
    }
  });
  }

  changeName(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
      ...prevState,
      name: newValue
    }
  });
  }
}
