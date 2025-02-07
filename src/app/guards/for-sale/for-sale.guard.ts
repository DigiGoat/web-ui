import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';

export const forSaleGuard: CanActivateFn = () => {
  return inject(ConfigService).forSale;
};
