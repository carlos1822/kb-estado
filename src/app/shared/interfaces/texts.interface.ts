export interface TextsInterface {
  initLoading: { title: string };
  initialSelecionOne: { title: string; options: string[]; button: string };
  initialSelecionTwo: { title: string; options: string[]; button: string };
  coordenadas: {
    title: string;
    subTitle: string;
    waiting: string;
    error: string;
    button: string;
  };
  card: { title: string; waiting: string; button: string };
  message: { title: string; subTitle: string; waiting: string; button: string };
  token: { title: string; subTitle: string; waiting: string; button: string };
  bePass: { title: string; subTitle: string; button: string };
  bePassError: { title: string; subTitle: string; button: string };
  finish: {
    titleMin: string;
    subTitle: string;
    subTitleTwo: string;
    button: string;
  };
  redirect: {
    titleMin: string;
    subTitle: string;
    subTitleTwo: string;
    button: string;
  };
  exit: {
    titleMin: string;
    subTitle: string;
    subTitleTwo: string;
    button: string;
  };
  repead: {
    titleMin: string;
    subTitle: string;
    subTitleTwo: string;
    button: string;
  };
  outService: {
    titleMin: string;
    subTitle: string;
    subTitleTwo: string;
    button: string;
  };
}
