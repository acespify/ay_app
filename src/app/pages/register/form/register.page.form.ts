import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { delay, of } from "rxjs";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
       let form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            repeatPassword: [''],
            phone: ['', [Validators.required]]
        });
        form.get('repeatPassword')?.setValidators(matchPasswordAndRepeatPassword(form));
        return form;
    }

    public getForm() : FormGroup {
        return this.form;
    }
}

function matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    
        const password = form.get('password');
        const repeatPassword = form.get('repeatPassword');

        const validator = () => {
            return password?.value == repeatPassword?.value ? null : {isntMatching: true}
        };    
         
        return validator;  
    
}