import { Component, signal, computed, effect, inject, Injector } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model'; 
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
/*     {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear Proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componente',
      completed: false,
    }, */
  ]);

  filter = signal<'all' | 'pending' | 'completed'> ('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter((task) => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  /* Clase 22 LocalStorage ngOnInit*/

 /*  injector = inject(Injector); */

   constructor() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
   } 

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
  }

/*   trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  } */

  /* Clase 12, ngfor para objetos (interfaz task.model.ts) */

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title:string){
    const newTask ={
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  /* Clase 11, directivas de control ngfor */

  deleteTask(index:number){
     this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
  }

  /* Clase 13, update task completed */

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }


  /* Clase 20 Editar texto de tarea */

  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });
  }


  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }


  /* Clase 21 Computed States */
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
