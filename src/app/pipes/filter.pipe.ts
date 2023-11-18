import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string): any[] {

    if(text === '') {
      return array;
    }

    text = text.toLowerCase();

    return array.filter(item => {
      return item.name.toLowerCase()
        .includes(text);
    })
  }

}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filtro'
// })
// export class FiltroPipe implements PipeTransform {

//   transform(arreglo: any [], texto: string): any[] {
//     if(texto === '') {
//       return arreglo;
//     }
//     texto = texto.toLowerCase();
//     return arreglo.filter(item => {
//       return item.nombre.toLowerCase()
//         .includes(texto);
//     })
      
    
//   }

// }
