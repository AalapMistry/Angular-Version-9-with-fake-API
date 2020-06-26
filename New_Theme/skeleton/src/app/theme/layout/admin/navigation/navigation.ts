import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'other',
    title: 'Admin',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'dashboard  ',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/project',
        classes: 'nav-item',
        icon: 'fa-product-hunt'
      },
       {
        id: 'user-list  ',
        title: 'Users',
        type: 'item',
        url: '/user-list',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'product-list  ',
        title: 'Products',
        type: 'item',
        url: '/product-list',
        classes: 'nav-item',
        icon: 'fa-product-hunt'
      },
      {
        id: 'category-list  ',
        title: 'Categorys',
        type: 'item',
        url: '/category-list',
        classes: 'nav-item',
        icon: 'fa-product-hunt'
      },
      {
        id: 'email-list  ',
        title: 'Emails',
        type: 'item',
        url: '/email-list',
        classes: 'nav-item',
        icon: 'fa-product-hunt'
      },
      
      // {
      //   id: 'menu-level',
      //   title: 'Menu Levels',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   children: [
      //     {
      //       id: 'menu-level-2.1',
      //       title: 'Menu Level 2.1',
      //       type: 'item',
      //       url: 'javascript:',
      //       external: true
      //     },
      //     {
      //       id: 'menu-level-2.2',
      //       title: 'Menu Level 2.2',
      //       type: 'collapse',
      //       children: [
      //         {
      //           id: 'menu-level-2.2.1',
      //           title: 'Menu Level 2.2.1',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         },
      //         {
      //           id: 'menu-level-2.2.2',
      //           title: 'Menu Level 2.2.2',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'disabled-menu',
      //   title: 'Disabled Menu',
      //   type: 'item',
      //   url: 'javascript:',
      //   classes: 'nav-item disabled',
      //   icon: 'feather icon-power',
      //   external: true
      // }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
