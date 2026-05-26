import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.alunoService.getAlunos().subscribe({
      next: (dados) => {
        this.alunos = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar alunos:', err);
        this.errorMessage = 'Não foi possível carregar a lista de alunos. O servidor está rodando?';
        this.isLoading = false;
      }
    });
  }
}
