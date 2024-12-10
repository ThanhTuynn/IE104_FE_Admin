import React, { useState } from 'react';
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import './Storeinfo.css';


const Storeinfo = () => {
  // State để kiểm soát các trường nhập liệu
  const [username, setUsername] = useState('Pawfect Petcare Center');
  const [email, setEmail] = useState('contact@pawfect.vn');
  const [phone, setPhone] = useState('0382868383');
  const [address, setAddress] = useState('313 Xô Viết Nghệ Tĩnh, Phường 24, Quận Bình Thạnh, TP.HCM');
  const [general, setGeneralPolicy] = useState('Nguyễn An Hải Chào mừng bạn đến với Pawfect Petcare Center! Việc truy cập và sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn đồng ý với các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ để hiểu rõ quyền lợi và trách nhiệm của mình khi sử dụng dịch vụ của chúng tôi.Chấp nhận điều khoản      - Khi sử dụng website Pawfect Petcare Center, bạn xác nhận rằng đã đọc và đồng ý tuân thủ các điều khoản này.      - Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng website và các dịch vụ liên quan.Sản phẩm và dịch vụ       - Chúng tôi cung cấp các sản phẩm và dịch vụ chăm sóc thú cưng, bao gồm thức ăn, phụ kiện, chăm sóc sức khỏe và dịch vụ tư vấn chuyên nghiệp.      - Thông tin sản phẩm trên website được cập nhật chính xác nhất có thể, nhưng có thể thay đổi mà không cần báo trước.Sở hữu trí tuệ      - Tất cả nội dung, hình ảnh, và thông tin trên website đều thuộc quyền sở hữu của Pawfect Petcare Center và được bảo vệ bởi luật sở hữu trí tuệ.      - Nghiêm cấm sao chép, phát tán hoặc sử dụng trái phép bất kỳ nội dung nào trên website mà không có sự đồng ý bằng văn bản từ chúng tôi.Giá cả và thanh toán      - Giá của các sản phẩm và dịch vụ được niêm yết trên website có thể thay đổi tùy theo thời điểm mà không cần thông báo trước.      - Chúng tôi cung cấp nhiều phương thức thanh toán an toàn và thuận tiện cho khách hàng.Chính sách vận chuyển và đổi trả       - Chi tiết về vận chuyển, đổi trả và bảo hành sẽ được quy định cụ thể trên từng sản phẩm. Khách hàng vui lòng tham khảo kỹ trước khi đặt hàng để đảm bảo quyền lợi.      - Mọi yêu cầu đổi trả hoặc bảo hành phải tuân thủ theo chính sách đã công bố trên website.Bảo mật thông tin      - Pawfect Petcare Center cam kết bảo vệ quyền riêng tư của khách hàng. Mọi thông tin cá nhân thu thập sẽ được bảo mật và chỉ sử dụng cho mục đích liên quan đến đơn hàng và trải nghiệm của bạn tại website.Giới hạn trách nhiệm     - Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại hay mất mát nào phát sinh từ việc sử dụng sản phẩm không đúng cách hoặc không tuân theo hướng dẫn sử dụng từ phía nhà sản xuất.Thay đổi điều khoản      - Pawfect Petcare Center có quyền thay đổi và cập nhật điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Khách hàng có trách nhiệm kiểm tra thường xuyên để cập nhật những thay đổi mới nhất.      - Chúng tôi rất vui mừng được phục vụ bạn và thú cưng của bạn tại Pawfect Petcare Center. Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi!');
  const [guarantee, setGuaranteePolicy] = useState('Chào mừng quý khách đến với Pawfect Petcare Center! Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao nhất dành cho thú cưng của bạn. Chính sách bảo hành của chúng tôi được thiết lập để đảm bảo quyền lợi của khách hàng khi mua sắm tại website.Sản phẩm được bảo hành      - Các sản phẩm phụ kiện và đồ dùng cho thú cưng (chuồng, lồng, đồ chơi, v.v.) sẽ được bảo hành theo chính sách của nhà sản xuất hoặc nhà cung cấp.      - Thức ăn, đồ ăn vặt và các sản phẩm tiêu hao không thuộc diện bảo hành, tuy nhiên chúng tôi đảm bảo về chất lượng và hạn sử dụng rõ ràng trên bao bì.Điều kiện bảo hành     - Sản phẩm phải còn nguyên tem bảo hành và chưa qua sửa chữa bởi bên thứ ba.     - Sản phẩm chỉ được bảo hành nếu gặp lỗi từ phía nhà sản xuất, bao gồm lỗi kỹ thuật hoặc lỗi chất lượng vật liệu.     - Thời gian bảo hành sẽ được quy định cụ thể theo từng sản phẩm và thông báo rõ ràng trên trang sản phẩm.Quy trình bảo hành      - Khách hàng vui lòng liên hệ với đội ngũ chăm sóc khách hàng của Pawfect Petcare Center qua số điện thoại hoặc email được cung cấp để yêu cầu bảo hành.      - Khi gửi sản phẩm bảo hành, vui lòng đóng gói sản phẩm cẩn thận và gửi kèm đầy đủ chứng từ mua hàng (hóa đơn, phiếu bảo hành nếu có).      - Chúng tôi sẽ kiểm tra sản phẩm trong vòng 7-10 ngày làm việc và thông báo kết quả bảo hành cho quý khách.Hình thức bảo hành      - Sản phẩm lỗi sẽ được sửa chữa hoặc thay thế miễn phí trong thời gian bảo hành.      - Nếu sản phẩm không thể sửa chữa hoặc thay thế, Pawfect Petcare Center sẽ hoàn tiền theo giá trị sản phẩm tại thời điểm mua.Trường hợp không thuộc diện bảo hành      - Sản phẩm bị hư hỏng do tác động từ bên ngoài như va đập, rơi vỡ, nước hoặc thú cưng cắn phá.      - Sản phẩm bị hư hỏng do khách hàng sử dụng sai cách hoặc không tuân theo hướng dẫn của nhà sản xuất.      - Sản phẩm không còn tem bảo hành, hoặc không có chứng từ mua hàng từ Pawfect Petcare Center.Chính sách đổi trả      - Ngoài chính sách bảo hành, chúng tôi cũng cung cấp chính sách đổi trả linh hoạt trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm gặp lỗi hoặc không đúng với mô tả.      - Để đổi trả sản phẩm, vui lòng liên hệ với chúng tôi và cung cấp thông tin về đơn hàng cùng lý do đổi trả.      - Chúng tôi cam kết luôn lắng nghe và hỗ trợ quý khách trong mọi vấn đề liên quan đến bảo hành sản phẩm. Hãy yên tâm mua sắm tại Pawfect Petcare Center, nơi chúng tôi luôn đặt lợi ích của bạn và thú cưng lên hàng đầu!Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Pawfect Petcare Center!')
  const [refund, setRefundPolicy] = useState('CHÍNH SÁCH ĐỔI - TRẢ HÀNGĐổi hàng – trả hàng miễn phí     Bên mua sẽ được đổi hàng – trả hàng miễn phí trong thời gian 07 (bảy) ngày kể từ khi nhận hàng hóa với điều kiện: hàng hóa chưa qua sử dụng còn nguyên tem mác, nguyên kiện và có đầy đủ hóa đơn mua hàng.Đổi hàng – trả hàng tính phí      - Đối với hàng hóa chưa qua sử dụng, còn nguyên tem mác, nguyên kiện và có đầy đủ hóa đơn mua hàng: từ ngày thứ 8 đến ngày thứ 15 sau khi nhận hàng hóa nếu bên mua có nhu cầu muốn đổi sản phẩm khác hoặc trả lại sản phẩm thì sẽ áp dụng mức phí là 15% giá trị sản phẩm.      - Đối với hàng hóa đã tháo vỏ bao bì, tem mác, trong vòng 15 ngày:        + Bên mua đổi sản phẩm khác mất phí 15% giá trị sản phẩm.        + Bên mua Trả sản phẩm mất phí 30% giá trị sản phẩm.Không áp dụng đổi – trả hàng:      - Sản phẩm mua trong các chương trình khuyến mại, giảm giá, sử dụng phiếu mua hàng (voucher), điểm tích lũy.      - Sản phẩm bên mua đã nhận hàng vượt quá 15 ngày kể từ ngày ghi trên hóa đơn mua hàng.�      - Sản phẩm đặt riêng theo yêu cầu (ví dụ: Thẻ tên)Điều khoản vận chuyển sản phẩm đổi – trả:     Bên mua phải tự vận chuyển sản phẩm đổi – trả đến nơi mua hàng hoặc chịu toàn bộ chi phí vận chuyển sản phẩm đổi hoặc trả theo quy định của bên bán.Xuất trả hóa đơn VAT:      - Do bên bán sử dụng hoá đơn điện tử và xuất hoá đơn trong ngày bán hàng, chính vì vậy:      - Trong mọi trường hợp đổi hàng – trả hàng nếu bên mua đã lấy hóa đơn VAT (hóa đơn giá trị gia tăng) thì bên mua có trách nhiệm xuất hóa đơn VAT hoàn trả chính xác các sản phẩm cần đổi – trả cho bên bán. Nếu bên mua không xuất hóa đơn VAT lại cho bên bán của sản phẩm đổi – trả thì bên bán có quyền hủy hóa đơn có sản phẩm đổi – trả.CHÍNH SÁCH HOÀN TIỀNNhằm giúp bạn thấy thoải mái và an tâm hơn khi mua sắm tại Pawfect Petcare Center, khách hàng và thành viên Pawfect hoàn toàn có thể đổi hoặc trả sản phẩm sau khi mua hàng.Khách hàng được kiểm tra sản phẩm trước khi nhận hàng     Pawfect khuyến khích khách hàng nên kiểm tra sản phẩm trước khi thanh toán, hoặc sau khi nhận được hàng nhằm giúp khách hàng an tâm và thoải mái hơn khi lựa chọn mua sắm tại Paddy. Tình trạng sản phẩm được đổi hoặc trả      Hàng hóa đổi/trả cần kèm theo hóa đơn mua hàng gốc từ Pawfect và còn hạn sử dụng kèm theo:      - Còn nguyên tem, nhãn, bao bì, seal.      - Bao bì sản phẩm không nhàu nát, xé rách, lủng lỗ.      - Chưa qua sử dụng (mới 100%).Thời hạn đổi/trả sản phẩm      - Đối với Hạt - thức ăn khô, Pate - thức ăn ướt, Xương - thức ăn ặt, Sữa bột - sữa nước, Vitamin - thuốc bổ, Thuốc xổ giun, Sữa tắm - nước hoa, Dung dịch đặc trị, Dung dịch chăm sóc, Dung dịch sát khuẩn - khử mùi, Đồ chơi các loại, Vật dụng chăm sóc      - Thời gian đổi/trả áp dụng: trong vòng 5 ngày kể từ khi bạn nhận được sản phẩm.      - Các danh mục sản phẩm còn lại tuỳ thuộc vào chính sách của Pawfect.Phương thức đổi/trả và thời gian giải quyết     Khi nhận được yêu cầu đổi/trả sản phẩm, Paddy sẽ cố gắng giải quyết trong vòng 24h từ lúc nhận được yêu cầu. Khách hàng vui lòng lưu ý:      - Bạn không tốn phí đổi/trả sản phẩm.      - Bạn có thể đổi/trả sản phẩm tại cửa hàng  (168 Trường Sa) hoặc yêu cầu dịch vụ chuyển phát, bạn thanh toán phí vận chuyển phát sinh.      - Khi bạn yêu cầu đổi/trả sản phẩm sau thời gian đổi/trả tại, chúng tôi có thể từ chối giải quyết.     Đơn hàng được xác nhận là lỗi sai sót (hàng hóa, số lượng, giao hàng…) từ phía Paddy, chúng tôi sẽ đổi sản phẩm cho bạn trong vòng 24-48h kể từ khi nhận được thông báo, áp dụng cho tất cả đơn hàng nội thành và các tỉnh thành khác. Chúng tôi khuyến khích bạn nên kiểm tra sản phẩm trước khi thanh toán.')
  const [info, setInfo] = useState('Về chúng tôi - Pawfect Petcare CenterChào mừng đến với Pawfect Petcare Center, nơi mang đến sự chăm sóc hoàn hảo và các sản phẩm chất lượng cao dành cho thú cưng của bạn! Tại Pawfect Petcare Center, chúng tôi hiểu rằng thú cưng không chỉ là bạn đồng hành mà còn là một thành viên trong gia đình. Chính vì vậy, chúng tôi cam kết cung cấp các dịch vụ và sản phẩm giúp cải thiện chất lượng sống của chó mèo, từ sức khỏe đến sắc đẹp, giúp chúng luôn khỏe mạnh và vui vẻ.Với đội ngũ nhân viên tận tâm và có kinh nghiệm, chúng tôi tự hào là nơi các chủ thú cưng có thể gửi gắm niềm tin. Chúng tôi cung cấp các dịch vụ từ chăm sóc sức khỏe, spa, tắm gội đến các sản phẩm dinh dưỡng, đồ chơi và phụ kiện tiện ích cho thú cưng, tất cả đều được chọn lọc kỹ càng để đảm bảo an toàn và hiệu quả cao nhất.Tầm nhìnTầm nhìn của chúng tôi là trở thành một trong những trung tâm chăm sóc và cung cấp sản phẩm cho thú cưng hàng đầu tại Việt Nam. Chúng tôi mong muốn tạo ra một cộng đồng thú cưng khỏe mạnh và hạnh phúc, nơi mỗi chú chó, chú mèo đều được yêu thương, chăm sóc chu đáo và có một cuộc sống tràn đầy niềm vui.Pawfect Petcare Center hướng đến việc phát triển không ngừng, sáng tạo ra các dịch vụ và sản phẩm tiện ích, góp phần nâng cao chất lượng cuộc sống cho thú cưng và mang lại sự hài lòng tuyệt đối cho khách hàng.Sứ mệnhSứ mệnh của chúng tôi là cung cấp các dịch vụ và sản phẩm chất lượng cao, an toàn và đáng tin cậy cho chó mèo, giúp chúng phát triển khỏe mạnh và sống vui vẻ bên gia đình. Chúng tôi tin rằng mỗi thú cưng đều xứng đáng được chăm sóc tốt nhất, với một môi trường yêu thương và đầy đủ điều kiện để phát triển.Bằng sự tận tâm và chuyên nghiệp, Pawfect Petcare Center cam kết mang lại những trải nghiệm tuyệt vời nhất cho cả thú cưng và chủ nhân. Chúng tôi mong muốn không chỉ chăm sóc vẻ bề ngoài mà còn là người bạn đồng hành giúp nâng cao sức khỏe và sự hạnh phúc cho thú cưng của bạn.');


 
  // State để kiểm soát việc hiển thị modal và dữ liệu mật khẩu
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Hàm để hiển thị modal
  const showModal = () => {
    setModalVisible(true);
  };


  // Hàm để ẩn modal
  const hideModal = () => {
    setModalVisible(false);
    setPasswordError(''); // Reset lỗi khi đóng modal
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };


  // Hàm xử lý cập nhật thông tin
  const handleUpdate = (event) => {
    event.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };


  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form


    // Kiểm tra các trường mật khẩu
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin.');
      return;
    }


    if (newPassword !== confirmNewPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }


    if (newPassword === currentPassword) {
      setPasswordError('Mật khẩu mới không được trùng với mật khẩu hiện tại.');
      return;
    }


    // Nếu tất cả hợp lệ
    alert('Đổi mật khẩu thành công!');
    hideModal(); // Đóng modal sau khi cập nhật thành công
  };


  return (
    <div>
        {/* Thanh tiêu đề */}
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Quản lý cửa hàng" />
      </div>

    <div className='store-info'>
      {/* CONTENT */}
      <section id="content">
        


       


        {/* Account Info Section */}
        <main style={{ marginLeft: '10px', padding: '5px' }}>
          <div className="account-info">
            <h2>Thông tin cửa hàng</h2>
            <form className="ant-form ant-form-horizontal" onSubmit={handleUpdate}>
              <div className="ant-row">
                <div className="ant-col ant-col-24 ant-col-md-12">
                  <label className="ant-form-item-label">Tên cửa hàng</label>
                  <input
                    className="ant-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị khi nhập
                  />
                </div>
              </div>
              <div className="ant-row">
                <div className="ant-col ant-col-24 ant-col-md-12">
                  <label className="ant-form-item-label">Email cửa hàng</label>
                  <input
                    className="ant-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị khi nhập
                  />
                </div>
              </div>
              <div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Số điện thoại cửa hàng</label>
    <input
      className="ant-input"
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)} // Cập nhật giá trị khi nhập
    />
  </div>
</div>

<div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Địa chỉ cửa hàng</label>
    <input
      className="ant-input"
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)} // Cập nhật giá trị khi nhập
    />
  </div>

              </div>
              <div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Điều khoản chung</label>
    <textarea
      className="ant-input"
      value={general} // Giá trị hiện tại
      onChange={(e) => setGeneralPolicy(e.target.value)} // Cập nhật giá trị khi nhập
      rows={4} // Số dòng hiển thị ban đầu
      placeholder="Nhập điều khoản chung tại đây"
    />
  </div>
</div>

<div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Chính sách bảo hành</label>
    <textarea
      className="ant-input"
      value={guarantee} // Giá trị hiện tại
      onChange={(e) => setGuaranteePolicy(e.target.value)} // Cập nhật giá trị khi nhập
      rows={4} // Số dòng hiển thị ban đầu
      placeholder="Nhập chính sách bảo hành tại đây"
    />
  </div>
</div>

              <div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Chính sách đổi trả hàng - hoàn tiền</label>
    <textarea
      className="ant-input"
      value={refund} // Giá trị hiện tại
      onChange={(e) => setRefundPolicy(e.target.value)} // Cập nhật giá trị khi nhập
      rows={4} // Số dòng hiển thị ban đầu
      placeholder="Nhập chính sách đổi trả hàng - hoàn tiền tại đây"
    />
  </div>

              </div>
              <div className="ant-row">
  <div className="ant-col ant-col-24">
    <label className="ant-form-item-label">Thông tin giới thiệu - Về chúng tôi</label>
    <textarea
      className="ant-input"
      value={info} // Giá trị hiện tại
      onChange={(e) => setInfo(e.target.value)} // Cập nhật giá trị khi nhập
      rows={6} // Số dòng hiển thị ban đầu
      placeholder="Nhập thông tin giới thiệu về chúng tôi tại đây"
    />
  </div>
</div>



           
             
              <div className="ant-row" style={{ marginTop: '20px' }}>
                <button className="ant-btn ant-btn-primary" type="submit">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>



    </div>
    </div>
  );
};


export default Storeinfo;
