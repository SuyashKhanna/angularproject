import { TestBed } from '@angular/core/testing';

import { FetchArticlesService } from './fetch-articles.service';

describe('FetchArticlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchArticlesService = TestBed.get(FetchArticlesService);
    expect(service).toBeTruthy();
  });
});
