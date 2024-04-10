import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy as NgTitleStrategy, type RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '../services/config/config.service';

@Injectable({ providedIn: 'root' })
export class TitleStrategy extends NgTitleStrategy {
  constructor(private readonly title: Title, private configService: ConfigService) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${this.formatTitle(title, routerState)} - ${this.configService.tabTitle}`.replaceAll('-', '·'));
    } else {
      this.title.setTitle(this.configService.tabTitle);
    }
  }
  formatTitle(title: string, routerState: RouterStateSnapshot): string {
    return title.replace(/(^|\s):(\w+)(\s|$)/g, (_match, prefix, id, suffix) => {
      return `${prefix}${this.getParam(id, routerState)}${suffix}`;
    });
  }
  getParam(param: string, routerState: RouterStateSnapshot) {
    function findParams(children: RouterStateSnapshot['root']['children']): Record<string, string> {
      const paramObj = {};
      if (children[0].children.length) {
        Object.assign(paramObj, findParams(children[0].children));
      }
      return Object.assign(paramObj, children[0].params);
    }
    const paramMap = findParams(routerState.root.children);
    return paramMap[param] ?? `:${param}`;
  }
}
