import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disciplina {
  codigo: string;
  nome: string;
  professor: string;
}

export interface Aluno {
  _id?: string;
  ra: string;
  nome: string;
  disciplinas: Disciplina[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = '/alunos';

  constructor(private http: HttpClient) {}

  // GET /alunos - Listar todos os alunos
  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  // GET /alunos/:ra - Buscar um aluno pelo RA
  getAluno(ra: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${ra}`);
  }

  // GET /alunos/:ra/disciplinas - Listar disciplinas de um aluno pelo RA
  getDisciplinas(ra: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/${ra}/disciplinas`);
  }

  // PUT /alunos/:ra - Atualizar os dados de um aluno
  updateAluno(ra: string, aluno: Partial<Aluno>): Observable<{ message: string, aluno: Aluno }> {
    return this.http.put<{ message: string, aluno: Aluno }>(`${this.apiUrl}/${ra}`, aluno);
  }
}
