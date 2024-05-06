import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';


jest.mock('../../../assets/images/map.json', () => ({
  __esModule: true,
  default: {},
}));
describe('ImageService', () => {
  let service: ImageService;
  const id = 'PD1234';
  const idFile = 'TEST_FILE_ID';
  const idDescription = `An image for an animal with id ${id}`;
  const nickname = 'GOAT_NICKNAME';
  const nicknameFile = 'TEST_FILE_NICKNAME';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
    service['imageMap'] = {
      [id]: [{
        file: idFile,
        alt: idDescription
      }],
      [nickname]: [{
        file: nicknameFile
      }]
    };
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  test('const NotFound', () => {
    expect(service.NotFound).toEqual({
      alt: 'The Requested Image Does Not Exist',
      file: '/assets/images/ImageNotFound.png',
    });
  });
  describe('getImage()', () => {
    it('should match an image when provided with a nickname', () => {
      const image = service.getImage(['FAKE_NICKNAME', nickname, 'FAKE_ID']);
      expect(image.file).toEqual(`/assets/images/${nickname}/${nicknameFile}`);
      expect(image.alt).toBeUndefined();
    });
    it('should match an image when provided with an id', () => {
      const image = service.getImage(['FAKE_ID', id, 'FAKE_NICKNAME']);
      expect(image.file).toEqual(`/assets/images/${id}/${idFile}`);
      expect(image.alt).toEqual(idDescription);
    });
    it('should return an empty path if the image does not exist', () => {
      const image = service.getImage(['FAKE_ID', 'FAKE_NICKNAME']);
      expect(image.file).toEqual('/');
      expect(image.alt).toEqual('The Requested Image Does Not Exist');
    });
  });
  describe('getImages()', () => {
    it('should match images when provided with a nickname', () => {
      const images = service.getImages(['FAKE_NICKNAME', nickname, 'FAKE_ID']);
      expect(images).toHaveLength(1);
      const image = images[0];
      expect(image.file).toEqual(`/assets/images/${nickname}/${nicknameFile}`);
      expect(image.alt).toBeUndefined();
    });
    it('should match images when provided with an id', () => {
      const images = service.getImages(['FAKE_ID', id, 'FAKE_NICKNAME']);
      expect(images).toHaveLength(1);
      const image = images[0];
      expect(image.file).toEqual(`/assets/images/${id}/${idFile}`);
      expect(image.alt).toEqual(idDescription);
    });
    it('should return an empty path if the image does not exist', () => {
      const images = service.getImages(['FAKE_ID', 'FAKE_NICKNAME']);
      expect(images).toHaveLength(1);
      const image = images[0];
      expect(image.file).toEqual('/');
      expect(image.alt).toEqual('The Requested Image Does Not Exist');
    });
  });
});
