import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FireserviceService } from '../services/fireservice.service';
import { getAuth } from "firebase/auth";
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, first } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() showPreview = true;
  @ViewChild('filePicker') 
  public user :any={
    name:"",
    email:"",
    photo:"",
  }
    //The Selected Image in the File Explorer
    selectedImage: any;

    //The variable that holds Photo URL
    uploadedImage: any;
    
  constructor(
    public filePickerRef: ElementRef<HTMLInputElement>,
    public router :Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private storage: AngularFireStorage,
    private fireService: FireserviceService,
    private af : AngularFirestore
  
  ) {
 
   }

  ngOnInit() {
  
       const data =  JSON.parse(localStorage.getItem('user')!);
      this.user = this.fireService.getUserById(data.uid)
      console.log(this.user)

   
  }


  logout(){
 this.afAuth.signOut().then(() => {
      const navigationExtras: NavigationExtras = { replaceUrl: true };
      this.router.navigate([''], navigationExtras);
      
    });
  }


  

  onSubmit(form: NgForm){

    const user = form.value.fname;
    const studentId = form.value.studentId;

    this.onUpdateUser(user, studentId);

  }//

  async onUpdateUser(name: string, studentNo: string){
    const loading = await this.loadingCtrl.create({
      message: 'Updating...',
      spinner: 'crescent',
      showBackdrop: true
    });

    //I call this method to upload the Image
    this.uploadUserPhoto();

    loading.present();

    this.user.photo = this.uploadedImage;
    this.user.editedAt = Date.now();
    this.fireService.saveDetails(this.user)
  }

  //The method for uploading the photo.
  uploadUserPhoto() {
    var filePath = `${this.user.uuid}/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.uploadedImage = url;
        })
      })
    ).subscribe();
  }

  onPickImage() {
    this.filePickerRef.nativeElement.click();
  }

  onFileChosen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const pickedFile = inputElement.files?.[0]; // Use optional chaining

    if (!pickedFile) {
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result?.toString();
      this.selectedImage = dataUrl;
    
    };
    fr.readAsDataURL(pickedFile);
  }
}
