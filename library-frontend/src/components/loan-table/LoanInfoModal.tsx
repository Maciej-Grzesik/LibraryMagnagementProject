import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
import { GetLoanDTO, UpdateLoanDTO } from "../api/dto/loan.dto";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
        returnDate: loanInfo?.returnDate || ''
    };

    const validationSchema = yup.object().shape({
        returnDate: yup.date().nullable(),
    });

    const onSubmit = useCallback(
        
        async (values: UpdateLoanDTO, formik: any) => {
            console.log("es>?")
            const response = await apiClient.updateLoan(values);
            if (response.success && response.data) {
                setLoanInfo(response.data);
                onClose();
            } else {
                
            }
        },
        [apiClient, onClose]
    );

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-md shadow-md w-1/3"
                style={{ animation: 'fade-up 0.7s' }}>
                <div className="flex justify-between">
                    <div className="text-xl font-bold mb-4">
                        {t('loanDetails')}
                    </div>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800 text-4xl relative -top-9 -right-5"
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage name="returnDate" component="div" className="text-red-500" />
                            </div>
                            <div className="flex justify-between mt-5">
                                <button
                                    type="button"
                                    className="bg-red-400 hover:bg-red-700 hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                                    onClick={onClose}
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-light hover:bg-blue-facebook hover:scale-110 duration-200 ease-in-out text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
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
