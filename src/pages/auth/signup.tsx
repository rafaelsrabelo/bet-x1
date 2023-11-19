
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import logo from './../../../public/icon.png';

const userFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

type UseForm = z.infer<typeof userFormSchema >;

export default function SignUp() {
  const router = useRouter();
  const { 
    register, 
    reset,
    handleSubmit, 
    formState: {isSubmitting}
  } = useForm<UseForm>({
    resolver: zodResolver(userFormSchema),

  });

  async function handleCreateUser(data: UseForm) {
    try {
      const response = await api.post('auth/signup', data);
      if (response.status === 201) {
        toast.success("Usuário criado com sucesso!");
        reset();
      } else {
        toast.error("Algo deu errado, por favor tente novamente."); 
      }
    } catch (error) {
      toast.error("Erro ao criar usuário: " );
    }
  }
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" href="/">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="w-8 h-8 mr-2"
          />
          O Rei da Banca
        </Link>
        <div className="w-full bg-white rounded-md shadow border border-primary-blue md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Cadastrar
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(handleCreateUser)}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nome"
                  {...register('name')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="nome@email.com"
                  {...register('email')}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <input type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  {...register('password')}
                />
              </div>
              <div>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme sua senha</label>
                <input type="password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  // {...register('confirm_password')}
                />
              </div>
              <button className="w-full h-10 text-xs bg-primary-blue text-white font-bold rounded-md hover" disabled={isSubmitting}>
                Enviar
              </button>
            </form>
            <div className="flex justify-center mt-4">
              <button
                className="text-xs text-primary-600 hover:text-primary-700 font-bold py-2 rounded-md focus:outline-none focus:ring"
                onClick={() => router.push('/auth/signin')}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}