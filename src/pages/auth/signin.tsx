import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';

const loginForm = z.object({
  email: z.string(),
  password: z.string(),
});

type UseForm = z.infer<typeof loginForm>;


export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UseForm>({
    resolver: zodResolver(loginForm),

  });
  const notify = () => toast("Login efetuado!");
  const notifyError = () => toast.error("Usuário não encontrado!");

  async function login(data: UseForm) {
    try {
      const response = await api.post('auth/signin', data);
      if (response.status === 200) {
        const token = response.data.token;

        const setCookieResponse = await fetch('/api/setCookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
          credentials: 'include',
        });

        if (setCookieResponse.ok) {
          router.push('/games');
          notify();
        } else {
          notifyError();
        }
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
      console.error("Erro ao fazer login:", error);
    }
  }


  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
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
              Entrar
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(login)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" {...register('email')} id="email" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="nome@email.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <input type="password" {...register('password')} id="password" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" />
              </div>
              <div className="">
                <button className="w-full h-10 text-xs bg-primary-blue text-white font-bold py-2 rounded-md hover">
                  Enviar
                </button>
              </div>
            </form>
            <div className="mt-6">
              <p className="text-primary-600 hover:text-primary-700 font-medium rounded-md text-sm py-2.5  dark:hover:text-primary-500 transition duration-300 ease-in-out">
                Não tem conta? <Link href="/auth/signup" className="hover:underline text-primary-blue">Cadastre aqui</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;

  if (token) {
    return {
      redirect: {
        destination: '/games',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};