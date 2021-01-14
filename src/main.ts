import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ServiceAccount } from 'firebase-admin/lib/credential'
import { AppModule } from './app.module'
import admin from 'firebase-admin'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())

    const configService: ConfigService = app.get(ConfigService)
    const adminConfig: ServiceAccount = {
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    }
    const databaseURL = `https://${adminConfig.projectId}.firebaseio.com`

    await admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        databaseURL,
    })
    // const db = admin.firestore()
    // const docRef = db.collection('users')
    // const c = await docRef.add({
    //     first: 'Ade',
    //     last: 'Lovelace',
    //     born: 1816,
    // })
    //
    // console.log(c)
    await app.listen(3000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
