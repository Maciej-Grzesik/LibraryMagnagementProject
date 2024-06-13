import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { CreateBookDTO, GetBookDTO, ResponseBookDTO } from "./dto/book.dto";
import { CreateUserDTO, ResponseUserDTO } from "./dto/user.dto";
import { GetLoanDTO, CreateLoanDTO, ResponseLoanDTO } from "./dto/loan.dto";

export type ClientResponse<T> = {
    success: boolean,
    data: T,
    statusCode: number
}

export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        console.log("nowy obiekt");
        this.client = axios.create({
            baseURL: 'http://localhost:8080/api',
        });
    }
    public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/auth/login', data);
            console.log(response.data) // dodac header

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

    public async addBook(data: CreateBookDTO): Promise<ClientResponse<ResponseBookDTO | null>> {
        try {
            const response = await this.client.post('/books/create', data);
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

    public async addUser(data: CreateUserDTO): Promise<ClientResponse<ResponseUserDTO | null>> {
        try {
            const response = await this.client.post('/auth/register', data);
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

    public async getLoans(): Promise<ClientResponse<GetLoanDTO[] | null>> {
        try {
            const response = await this.client.get<GetLoanDTO[]>('/loan/getAll');
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