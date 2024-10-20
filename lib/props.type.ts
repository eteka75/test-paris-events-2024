export interface HomePageProps {
  searchParams: {
    query?: string;
    limit?: string;
    page?: string;
    search?: string;
    nb_par_page?: string;
  };
}
export interface EventPageProps {
  id: string;
}
