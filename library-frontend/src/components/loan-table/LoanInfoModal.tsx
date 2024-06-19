import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { GetLoanDTO, UpdateLoanDTO } from '../api/dto/loan.dto';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

interface LoanInfoModalProps {
  onClose: () => void;
  loan: GetLoanDTO | undefined;
}

const LoanInfoModal: React.FC<LoanInfoModalProps> = ({ onClose, loan }) => {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [loanInfo, setLoanInfo] = useState<GetLoanDTO | undefined>(loan);

  useEffect(() => {
    const getLoan = async (loanId: number) => {
      const response = await apiClient.getLoan(loanId);
      if (response.success && response.data) {
        setLoanInfo(response.data);
      }
    };
    if (loan && typeof loan.id === 'number') {
      getLoan(loan.id);
    }
  }, [loan, apiClient]);

  const initialValues: UpdateLoanDTO = {
    loanId: loan?.id || 0,
    returnDate: loanInfo?.returnDate || '',
  };

  const validationSchema = yup.object().shape({
    returnDate: yup.date().nullable(),
  });

  const onSubmit = useCallback(
    async (values: UpdateLoanDTO, formik: any) => {
      console.log('es>?');
      const response = await apiClient.updateLoan(values);
      if (response.success && response.data) {
        setLoanInfo(response.data);
        onClose();
      } else {
      }
    },
    [apiClient, onClose],
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div
        className="relative w-1/3 rounded-md bg-white p-6 shadow-md"
        style={{ animation: 'fade-up 0.7s' }}
      >
        <div className="flex justify-between">
          <div className="mb-4 text-xl font-bold">{t('loanDetails')}</div>
          <button
            type="button"
            className="relative -right-5 -top-9 text-4xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700">{t('returnDate')}</label>
                <Field
                  type="date"
                  name="returnDate"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="returnDate"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  className="focus:shadow-outline rounded bg-red-400 px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-red-700 focus:outline-none"
                  onClick={onClose}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-light px-6 py-2 font-bold text-white duration-200 ease-in-out hover:scale-110 hover:bg-blue-facebook focus:outline-none"
                  disabled={!isValid || isSubmitting}
                >
                  {t('save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoanInfoModal;
