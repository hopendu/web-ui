import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  fileUpload(file): void {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIATON6LVU36YEWCSVY',
              secretAccessKey: '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',
              region: 'us-east-1',
          }
      );
    const params = {
          Bucket: 'izinga-aws',
          Key:  file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };

    bucket.upload(params, function(err, data) {
          if (err) {
              console.log('ERROR: ', JSON.stringify( err));
              return false;
          }
          console.log('File Uploaded.', data);
          return true;
      });
    }
}
