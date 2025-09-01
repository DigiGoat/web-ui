import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { CustomPagesService } from '../../services/custom-pages/custom-pages.service';

export const customPageGuard: CanMatchFn = (_route, segments) => {
  const customPage = inject(CustomPagesService).getPage(segments[0].path);
  return !!customPage;
};
