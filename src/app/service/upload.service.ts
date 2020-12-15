import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  fileUpload(file, folder): string {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: environment.accessKeyId,
              secretAccessKey: environment.secretAccessKey,
              region: environment.region ,
          }
      );
    const params = {
          Bucket: environment.Bucket,
          Key:  folder + '/images/' + file.name,
          Body: file,
          ACL: environment.ACL,
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
    return params.Key;
    }
}
