import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', () => {

    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    })

    it('should empty name be invalid', () => {
        expect(form.get('name')?.valid).toBeFalsy();
    })

    it('should empty email be invalid', () => {
        expect(form.get('email')?.valid).toBeFalsy();
    })

    it('should empty password be invalid', () => {
        expect(form.get('password')?.valid).toBeFalsy();
    })

    it('should empty phone be invalid', () => {
        expect(form.get('phone')?.valid).toBeFalsy();
    })

    it('should empty | be invalid', () => {
        expect(form.get('email')?.valid).toBeFalsy();
    })

    it('should invaild email be invalid', () => {
        form.get('email')?.setValue('invalidEmail');

        expect(form.get('email')?.valid).toBeFalsy();
    })

    it('should password less that 8 characters be invalid', () => {
        form.get('password')!.setValue('123456');

        expect(form.get('password')?.invalid).toBeTruthy();
        expect(form.get('password')?.errors?.['minlength']).toBeTruthy();
    })

    it('should password password different from repeat password be invalid', () => {
        form.get('password')?.setValue('anyPassword');
        //registerPageForm.addMatchingPasswordValidator(); //call the validator after values are set.
        form.get('repeatPassword')?.setValue('anotherPassword');
        //form.get('repeatPassword')?.updateValueAndValidity(); // Added this line
        
        expect(form.get('repeatPassword')?.errors?.['isntMatching']).toBeTruthy(); // Check for the custom error
        
    })

    it('should form be valid', () => {
        form.get('name')?.setValue("anyName");
        form.get('email')?.setValue("any@email.com");
        form.get('password')?.setValue("anyPassword");
        form.get('repeatPassword')?.setValue("anyPassword");
        form.get('phone')?.setValue("anyPhone");

        expect(form.valid).toBeTruthy();
    })

})