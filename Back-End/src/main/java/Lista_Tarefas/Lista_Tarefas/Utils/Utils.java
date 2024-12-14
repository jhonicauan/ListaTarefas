package Lista_Tarefas.Lista_Tarefas.Utils;

public class Utils {
    
    public static <T> T replaceNull(T originalValue,T newValue){
        if(newValue == null){
            return originalValue;
        }
        return newValue;
    }
}
