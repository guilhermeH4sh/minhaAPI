import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {
  aluno: Aluno | null = null;
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
        this.carregarDetalhes();
      } else {
        this.errorMessage = 'RA inválido fornecido na rota.';
        this.isLoading = false;
      }
    });
  }

  carregarDetalhes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.alunoService.getAluno(this.ra).subscribe({
      next: (dados) => {
        this.aluno = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao obter detalhes do aluno:', err);
        if (err.status === 404) {
          this.errorMessage = `Aluno com o RA ${this.ra} não foi encontrado.`;
        } else {
          this.errorMessage = 'Erro de comunicação com o servidor ao carregar os detalhes.';
        }
        this.isLoading = false;
      }
    });
  }
}
