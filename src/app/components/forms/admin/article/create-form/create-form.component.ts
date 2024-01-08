import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  createForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private PostService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
    ) {
    this.createForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      image: [''],
      video: [''],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.PostService.getPostById(postId).subscribe(
          (post) => {
            // Utilisez les données de l'article pour initialiser le formulaire
            this.createForm.patchValue({
              id: post.id,
              title: post.title,
              categoryId: post.categoryId,
              userId: post.userId,
              content: post.content,
              video: post.video,
              // Ne pas définir 'image' car les champs de fichier ne peuvent pas être préremplis
            });
          },
          (error) => {
            console.error('Erreur lors du chargement de l\'article', error);
          }
        );
      }
    });

    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }


  // Dans CreateFormComponent

  onSubmit() {
    if (this.createForm.valid) {
      const formData = new FormData();

      // Ajouter tous les champs du formulaire à formData
      Object.keys(this.createForm.value).forEach(key => {
        if (key !== 'image') {
          formData.append(key, this.createForm.value[key]);
        }
      });

      // Ajouter les images à formData
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append('image', fileInput.files[i], fileInput.files[i].name);
        }
      }

      if (this.createForm.value.id) {
        // Mise à jour de l'article
        this.PostService.updatePost(this.createForm.value.id, formData).subscribe(
          response => {
            alert('Article mis à jour avec succès!');
            this.createForm.reset();
            this.router.navigate(['/admin/article']);
          }, error => {
              alert('Erreur lors de la mis à jour de l\'article');
          }

        );
      } else {
        // Création d'un nouvel article
        this.PostService.addPost(formData).subscribe(
          response => {
            alert('Article crée avec succès!');
            this.createForm.reset();
            this.router.navigate(['/admin/article']);
          }, error => {
              alert('Erreur lors de la création de l\'article');
          }
        );
      }
    }
  }






}