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
        description: idDescription
      }],
      [nickname]: [{
        file: nicknameFile
      }]
    };
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getImage()', () => {
    it('should match an image when provided with a nickname', () => {
      const image = service.getImage(['FAKE_NICKNAME', nickname, 'FAKE_ID']);
      expect(image.file).toEqual(`/assets/images/${nickname}/${nicknameFile}`);
      expect(image.description).toBeUndefined();
    });
    it('should match an image when provided with an id', () => {
      const image = service.getImage(['FAKE_ID', id, 'FAKE_NICKNAME']);
      expect(image.file).toEqual(`/assets/images/${id}/${idFile}`);
      expect(image.description).toEqual(idDescription);
    });
    it('should return ImageNotFound path if the image does not exist', () => {
      const image = service.getImage(['FAKE_ID', 'FAKE_NICKNAME']);
      expect(image.file).toEqual('/assets/images/ImageNotFound.png');
      expect(image.description).toEqual('The Requested Image Does Not Exist');
    });
    it('should contain ImageNotFound as a public const', () => {
      expect(service.NotFound).toMatchSnapshot();
    });
  });
});
