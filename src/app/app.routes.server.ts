import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [{
  path : 'shippingAddress/:CartId',
  renderMode : RenderMode.Server
},{
  path : 'allOrder/:Userid',
  renderMode : RenderMode.Server
},{
  path : 'proCategory/:catId',
  renderMode : RenderMode.Server
},{
  path : 'proBrand/:brandId',
  renderMode : RenderMode.Server
},
{
  path : 'details/:id',
  renderMode : RenderMode.Server
},
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
