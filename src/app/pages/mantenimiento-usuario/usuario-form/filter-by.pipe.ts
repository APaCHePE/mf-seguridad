import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filterBySystem',
  standalone: true,
})
export class FilterBySystemPipe implements PipeTransform {
  transform(modules: any[], systems: string[]): any[] {
    return modules.filter((m) => systems.includes(m.systemId))
  }
}

@Pipe({
  name: 'filterByModule',
  standalone: true,
})
export class FilterByModulePipe implements PipeTransform {
  transform(submodules: any[], modules: string[]): any[] {
    return submodules.filter((s) => modules.includes(s.moduleId))
  }
}

@Pipe({
  name: 'filterBySubmodule',
  standalone: true,
})
export class FilterBySubmodulePipe implements PipeTransform {
  transform(options: any[], submoduleId: string): any[] {
    return options.filter((o) => o.submoduleId === submoduleId)
  }
}

@Pipe({
  name: 'filterByIds',
  standalone: true,
})
export class FilterByIdsPipe implements PipeTransform {
  transform(items: any[], ids: string[]): any[] {
    return items.filter((item) => ids.includes(item.id))
  }
}
