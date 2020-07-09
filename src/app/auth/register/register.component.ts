import { UserService } from '../../pages/admin/users/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { validRoles } from '../../utils/enums';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  role: number;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  constructor(
    public _authService: AuthService,
    public _userService: UserService,
    public router: Router
  ) { }

  comparePasswords(field1: string, field2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup(
      {
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required)
      },
      { validators: this.comparePasswords('password', 'confirmPassword') }
    );
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const user = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.role === validRoles.Professional ? validRoles.Professional : validRoles.Patient
    };
    this._userService
      .newUser(user)
      .subscribe((user) => {
        this.changeImage(user.id);
        Swal.fire('Usuario creado', user.email, 'success');
        this.router.navigate(['/login']);
      },
    );
  }
  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error',
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }
  changeImage(userId) {
    this._userService
      .changeImage(this.imageUpload, userId)
      .then(() => {
        this.imageUpload = null;
      });
  }
}
