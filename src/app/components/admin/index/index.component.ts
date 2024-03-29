import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';
import { DataService } from 'src/app/services/data.service';
import { CategoryService } from 'src/app/services/category.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  usersCount: number = 0;
  postsCount: number = 0;
  categoriesCount: number = 0;
  contactCount: number = 0;
  constructor (
    private userService: InscriptionService,
    private postService: DataService,
    private categoryService: CategoryService,
    private contactService: ContactService

    ) {

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users) => this.usersCount = users.length,
      (error) => console.error('Erreur lors de la récupération des utilisateurs', error)
    );

    this.postService.getAllPosts().subscribe(
      (posts) => this.postsCount = posts.length,
      (error) => console.error('Erreur lors de la récupération des articles', error)
    );

    this.categoryService.getAllCategories().subscribe(
      (category) => this.categoriesCount = category.length,
      (error) => console.error('Erreur lors de la récupération des catégories', error)

    );

    this.contactService.getAllContacts().subscribe(
      (contact) => this.contactCount = contact.length,
      (error) => console.error('Erreur lors de la récupération des catégories', error)

    )


  }
}
