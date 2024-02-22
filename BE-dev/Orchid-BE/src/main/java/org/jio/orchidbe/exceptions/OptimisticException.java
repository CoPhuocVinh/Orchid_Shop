package org.jio.orchidbe.exceptions;/*  Welcome to Jio word
    @author: Jio
    Date: 10/24/2023
    Time: 9:29 AM
    
    ProjectName: fams-backend
    Jio: I wish you always happy with coding <3
*/

import org.springframework.dao.OptimisticLockingFailureException;

public class OptimisticException extends OptimisticLockingFailureException {
    public OptimisticException(String msg) {
        super(msg);
    }
}
