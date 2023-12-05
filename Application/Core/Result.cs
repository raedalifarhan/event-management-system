namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; } = default!;
        public string Error { get; set; } = string.Empty;

        public static Result<T> Success(T value) => 
            new Result<T>() { Value = value, IsSuccess = true };
        public static Result<T> Failure(string message) => 
            new Result<T>() { Error = message, IsSuccess = false };

    }
}
