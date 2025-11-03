import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Only attach header for requests to our API base
  const isOurApi = req.url.startsWith(environment.apiBaseUrl);
  if (!isOurApi) return next(req);

  const token = environment.apiKey;
  const withAuth = token
    ? req.clone({ 
        setHeaders: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      })
    : req;

  return next(withAuth);
};
