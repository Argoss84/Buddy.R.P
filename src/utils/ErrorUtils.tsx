import { insertLog } from '../services/AdminService';
import { useToast } from '../context/ToastContext';

interface ErrorHandlerParams {
  error: any;
  message: string;
  showToast?: boolean;
  consoleLog?: boolean;
  logToDatabase?: boolean;
  userId?: number;
}

export const handleError = async ({
  error,
  message,
  showToast = true,
  consoleLog = true,
  logToDatabase = false,
  userId
}: ErrorHandlerParams): Promise<void> => {
  const { showErrorToast } = useToast();

  // Log to console if enabled
  if (consoleLog) {
    console.error(message, error);
  }

  // Show toast if enabled
  if (showToast) {
    showErrorToast(message);
  }

  // Log to database if enabled
  if (logToDatabase) {
    try {
      await insertLog(
        'error',
        message,
        { error: error?.message || error },
        'ErrorHandler',
        userId || 0
      );
    } catch (dbError) {
      console.error('Failed to log error to database:', dbError);
    }
  }
}; 