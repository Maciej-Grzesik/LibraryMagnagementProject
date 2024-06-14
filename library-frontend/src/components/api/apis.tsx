import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { CreateBookDTO, GetBookDTO, ResponseBookDTO } from "./dto/book.dto";
import { CreateUserDTO, ResponseUserDTO } from "./dto/user.dto";
import { GetLoanDTO, CreateLoanDTO, ResponseLoanDTO } from "./dto/loan.dto";
import { jwtDecode } from "jwt-decode";

export type ClientResponse<T> = {
    success: boolean,
    data: T,
    statusCode: number
}

interface DecodedToken {
    role: string;
    sub: string;
}

export class LibraryClient {
    private client: AxiosInstance;
    private role: String = ''; 
    private username: String = '';

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8080/api',
        });
    }

    public getRole(): string | null {
        try {
            const authHeader = this.client?.defaults?.headers?.common?.['Authorization'];
            if (typeof authHeader !== 'string') {
                return null;
            }
    
            const token = authHeader.split(' ')[1];
            const decoded: DecodedToken = jwtDecode(token);
    
            return decoded.role;
        } catch (error) {
            return 'null';
        }
    }
    
    public getUsername(): string | null {
        try {
            const authHeader = this.client?.defaults?.headers?.common?.['Authorization'];
            if (typeof authHeader !== 'string') {
                return null;
            }
    
            const token = authHeader.split(' ')[1];
            const decoded: DecodedToken = jwtDecode(token);
    
            return decoded.sub;
        } catch (error) {
            return null;
        }
    }
    

    public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/auth/login', data);
            this.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            if (response.data.token) {
                console.log(jwtDecode(response.data.token))
            }
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }

    public async getBooks(): Promise<ClientResponse<GetBookDTO[] | null>> {
        try {
            const response = await this.client.get<GetBookDTO[]>('/books/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }

    public async addBook(data: CreateBookDTO): Promise<ClientResponse<ResponseBookDTO | null>> {
        try {
            const response = await this.client.post('/books/create', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }

    public async addUser(data: CreateUserDTO): Promise<ClientResponse<ResponseUserDTO | null>> {
        try {
            console.log(this.client.defaults)
            const response = await this.client.post('/auth/register', data);

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }

    public async getLoans(): Promise<ClientResponse<GetLoanDTO[] | null>> {
        try {
            const response = await this.client.get<GetLoanDTO[]>('/loan/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }

    public async addLoan(data: CreateLoanDTO): Promise<ClientResponse<ResponseLoanDTO | null>> {
        try {
            const response = await this.client.post('/loan/create', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            }
        }
    }
}
