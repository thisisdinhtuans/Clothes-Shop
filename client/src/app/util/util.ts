export function getCookie(key:string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  export function currencyFormat(amount: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  
    // Sử dụng formatter để định dạng số
    const formattedAmount = formatter.format(amount);
  
    // Thay đổi ký hiệu tiền tệ nếu cần
    const withoutCurrencySymbol = formattedAmount.replace(/[^0-9,.]/g, '');
  
    return withoutCurrencySymbol + 'đ'; // Thêm ký hiệu tiền tệ mong muốn
  }