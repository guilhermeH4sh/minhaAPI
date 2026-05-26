import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlunoService, Aluno, Disciplina } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.css']
})
export class AlunoEditComponent implements OnInit {
  aluno: Aluno | null = null;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  successMessage = '';
  ra = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const raParam = params.get('ra');
      if (raParam) {
        this.ra = raParam;
        this.carregarAluno();
      } else {
        this.errorMessage = 'RA inválido fornecido na rota.';
        this.isLoading = false;
      }
    });
  }

  carregarAluno(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.alunoService.getAluno(this.ra).subscribe({
      next: (dados) => {
        // Clonar profundamente para evitar alterar o estado global sem salvar
        this.aluno = JSON.parse(JSON.stringify(dados));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar aluno para edição:', err);
        this.errorMessage = 'Não foi possível buscar as informações do aluno.';
        this.isLoading = false;
      }
    });
  }

  adicionarDisciplina(): void {
    if (this.aluno) {
      if (!this.aluno.disciplinas) {
        this.aluno.disciplinas = [];
      }
      this.aluno.disciplinas.push({ codigo: '', nome: '', professor: '' });
    }
  }

  removerDisciplina(index: number): void {
    if (this.aluno && this.aluno.disciplinas) {
      this.aluno.disciplinas.splice(index, 1);
    }
  }

  salvar(): void {
    if (!this.aluno) return;

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validar se o nome está preenchido
    if (!this.aluno.nome.trim()) {
      this.errorMessage = 'O nome do aluno é obrigatório.';
      this.isSaving = false;
      return;
    }

    // Validar disciplinas (se existirem)
    if (this.aluno.disciplinas) {
      for (const d of this.aluno.disciplinas) {
        if (!d.codigo.trim() || !d.nome.trim() || !d.professor.trim()) {
          this.errorMessage = 'Preencha todos os campos de código, nome e professor para todas as disciplinas matriculadas.';
          this.isSaving = false;
          return;
        }
      }
    }

    const payload = {
      nome: this.aluno.nome.trim(),
      disciplinas: this.aluno.disciplinas || []
    };

    this.alunoService.updateAluno(this.ra, payload).subscribe({
      next: (res) => {
        this.successMessage = 'Informações do aluno atualizadas com sucesso!';
        this.isSaving = false;
        
        // Rola para o topo para exibir o banner de sucesso
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Redireciona de volta após 2 segundos para dar tempo de ver a mensagem
        setTimeout(() => {
          this.router.navigate(['/alunos', this.ra]);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao salvar aluno:', err);
        this.errorMessage = 'Não foi possível salvar os dados. Verifique a conexão com o servidor.';
        this.isSaving = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
