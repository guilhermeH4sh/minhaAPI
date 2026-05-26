import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlunoService, Aluno, Disciplina } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-disciplinas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aluno-disciplinas.component.html',
  styleUrls: ['./aluno-disciplinas.component.css']
})
export class AlunoDisciplinasComponent implements OnInit {
  aluno: Aluno | null = null;
  disciplinas: Disciplina[] = [];
  isLoading = true;
  errorMessage = '';
  ra = '';

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const raParam = params.get('ra');
      if (raParam) {
        this.ra = raParam;
        this.carregarDados();
      } else {
        this.errorMessage = 'RA inválido fornecido na rota.';
        this.isLoading = false;
      }
    });
  }

  carregarDados(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Carrega o aluno (para obter o nome)
    this.alunoService.getAluno(this.ra).subscribe({
      next: (alunoDados) => {
        this.aluno = alunoDados;
        
        // Chamada exata para o endpoint GET /alunos/:ra/disciplinas para atender o critério da atividade
        this.alunoService.getDisciplinas(this.ra).subscribe({
          next: (disciplinasDados) => {
            this.disciplinas = disciplinasDados;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao obter disciplinas:', err);
            this.errorMessage = 'Erro ao buscar a grade de disciplinas do aluno.';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Erro ao obter dados do aluno:', err);
        this.errorMessage = 'Erro ao buscar informações cadastrais do aluno.';
        this.isLoading = false;
      }
    });
  }
}
